({
    handleButtonMenuSelectOption: function (component, event, helper) {
        var action = event.getParam("value");
        
        if(action == "edit") helper.editRecord(component);
        if(action == "delete") helper.validateDelete(component);
        if(action == "pin" || action == "unpin") helper.togglePin(component);   
    },

    setRelDate : function(component,event,helper) {
        var lastModified = new Date(component.get("v.record.LastModifiedDate"));
        component.set("v.lastModified", lastModified);
        var localizedDateTime = $A.localizationService.formatDate(lastModified, "dd MMM yyyy, HH:mm");
        component.set("v.localDate", localizedDateTime);
    }
})
