({
    closeModalSuccess : function(component, event, helper) {
        var message = 'An Alert was updated successfully!';
        var recordId = component.get("v.recordId");
        
        if(recordId == undefined) message = 'A new Alert was created!';
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Great Success!",
            "message": message
        });
        component.find("overlayLib").notifyClose();
    },

    closeModal: function(component) {
        component.find("overlayLib").notifyClose();
    }
})
