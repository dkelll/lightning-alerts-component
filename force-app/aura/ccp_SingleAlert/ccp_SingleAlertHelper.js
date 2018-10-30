({
    validateDelete: function (component) {
        $A.createComponent("c:ccp_confirmDeleteModalFooter",{
            "recordId" : component.get("v.record").Id
        },
        function(footer, status) {
            if (status === "SUCCESS") {
                component.find('overlayLib').showCustomModal({
                    header: "Confirm Delete",
                    body: "Are you sure you want to delete this Alert?",
                    footer: footer,
                    showCloseButton: false,
                    closeCallback: function() {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            }                               
        });
        
    },

    editRecord: function(component) {
        $A.createComponent("c:ccp_NewAlert",{ // pass recordId to edit an existing Alert
            "recordId" : component.get("v.record").Id,
            "sObjectName" : component.get("v.sObjectName"),
            "parentId" : component.get("v.parentId")
        },
        function(editAlertModal, status) {
            if (status === "SUCCESS") {
                component.find('overlayLib').showCustomModal({
                    header: "Update Alert",
                    body: editAlertModal,
                    showCloseButton: true,
                    closeCallback: function() {
                        $A.get('e.force:refreshView').fire();
                    }
                });
            }                               
        });
    },

    togglePin: function(component) {
        var alert = component.get("v.record");
        var toggleAlertPin = component.get("c.toggleAlertPin");
        console.table(alert);
        toggleAlertPin.setParams({
            alert: alert
        });
        toggleAlertPin.setCallback(this, function(response) {
            var state = response.getState();
            console.log("State: " + state);
            console.log("response.status: " +response.getReturnValue());
            if(state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
            }
        }); 
        $A.enqueueAction(toggleAlertPin);

    }
})
