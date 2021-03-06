import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import * as SurveyKo from "survey-knockout";
import * as SurveyCreator from "survey-creator";
import * as widgets from "surveyjs-widgets";

import "inputmask/dist/inputmask/phone-codes/phone.js";

// widgets.icheck(SurveyKo);
// widgets.select2(SurveyKo);
// widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo);
// widgets.jqueryuidatepicker(SurveyKo);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo);
// widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
// widgets.autocomplete(SurveyKo);
// widgets.bootstrapslider(SurveyKo);

let CkEditor_ModalEditor = {
  afterRender: function(modalEditor, htmlElement) {
    let editor = window["CKEDITOR"].replace(htmlElement);
    editor.on("change", function() {
      modalEditor.editingValue = editor.getData();
    });
    editor.setData(modalEditor.editingValue);
  },
  destroy: function(modalEditor, htmlElement) {
    let instance = window["CKEDITOR"].instances[htmlElement.id];
    if (instance) {
      instance.removeAllListeners();
      window["CKEDITOR"].remove(instance);
    }
  }
};
SurveyCreator.SurveyPropertyModalEditor.registerCustomWidget(
  "html",
  CkEditor_ModalEditor
);

@Component({
  selector: "survey-creator",
  template: `
    <div id="surveyCreatorContainer"></div>
  `
})
export class SurveyCreatorComponent implements OnInit, OnDestroy {
  surveyCreator: SurveyCreator.SurveyCreator;
  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();
  
  ngOnInit() {

    
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer"
    );
    
    this.surveyCreator.haveCommercialLicense = true;
    this.surveyCreator.text = JSON.stringify(this.json);
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.surveyCreator.hideAdvancedSettings = true;

  }

  ngOnDestroy(){
    //remove all custom properties
    SurveyKo.JsonObject.metaData.removeProperty("questionbase","popupdescription:text");
    SurveyKo.JsonObject.metaData.removeProperty("page", "popupdescription:text");
  }

  saveMySurvey = () => {
    // console.log(JSON.stringify(this.surveyCreator.text));
    this.surveySaved.emit(JSON.parse(this.surveyCreator.text));
  };


}