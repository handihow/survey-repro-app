import { Component, Input, EventEmitter, Output, OnInit, OnChanges, ViewChild } from '@angular/core';
import * as Survey from 'survey-angular';
import * as widgets from 'surveyjs-widgets';
import * as SurveyPDF from 'survey-pdf';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { NotifierService } from 'angular-notifier';

import 'inputmask/dist/inputmask/phone-codes/phone.js';

widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);

Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'survey',
  templateUrl: './survey.component.html',
})
export class SurveyComponent implements OnInit {
  
  @Output() submitSurvey = new EventEmitter<any>();

  @Input()
  json: object;

  @Input()
  data: object;

  surveyModel : any;

  private readonly notifier: NotifierService;

  constructor(private storage: AngularFireStorage,private notifierService: NotifierService){
    this.notifier = notifierService;
  }

  click(result) {
    console.log(result);

  }


  ngOnInit() {
    
    this.surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) { return; }

      // Add a button;
      const btn = document.createElement('button');
      btn.className = 'button is-small is-rounded';
      btn.innerHTML = 'Meer info';
      const question = options.question;
      const notifier = this.notifier;
      btn.onclick = function () {
        // showDescription(question);
        notifier.notify('default', options.question.popupdescription);
      };
      const header = options.htmlElement.querySelector('h5');
      const span = document.createElement('span');
      span.innerHTML = '  ';
      header.appendChild(span);
      header.appendChild(btn);
    });
    this.surveyModel.onComplete
      .add(result =>
        this.submitSurvey.emit(result.data)
      );

    this.surveyModel.checkErrorsMode = "onValueChanged";

    this.surveyFix();
    
    Survey.SurveyNG.render('surveyElement', { model: this.surveyModel });

  }


  surveyFix() {
      var surveyContentParentNode = null;
      var surveyContentNode = document.getElementById("survey-content");
      var isRenderedBefore = !!surveyContentNode;

      if (isRenderedBefore) {
        surveyContentParentNode = surveyContentNode.parentNode;
        surveyContentParentNode.parentNode.removeChild(surveyContentParentNode);
      }
  }

  savePDF() {
    var options = {
      fontSize: 14,
      margins: {
        left: 10,
        right: 10,
        top: 10,
        bot: 10
      }
    };
    const surveyPDF = new SurveyPDF.Survey(this.json, options);
    surveyPDF.data = this.surveyModel.data;
    surveyPDF.save("xyz.pdf");
  }
}