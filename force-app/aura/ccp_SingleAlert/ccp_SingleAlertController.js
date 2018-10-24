({
    handleButtonMenuSelectOption: function (component, event, helper) {
        var action = event.getParam("value");

        if(action == "edit") helper.editRecord(component);
        if(action == "delete") helper.validateDelete(component);
    },

    setRelDate : function(component,event,helper) {
        var createdDate = new Date(component.get("v.record.CreatedDate"));
        component.set("v.createdDate", createdDate);
        var localizedDateTime = $A.localizationService.formatDate(createdDate, "dd MMM yyyy, HH:mm");
        component.set("v.localDate", localizedDateTime);
    }
})
