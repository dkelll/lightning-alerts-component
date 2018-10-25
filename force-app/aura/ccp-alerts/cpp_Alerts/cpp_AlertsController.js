({
    initAlerts : function (component, event, helper) {
        helper.loadAlerts(component);
    },

    createRecord : function (component, event, helper) {
        var sObjectType = component.get("v.sObjectName");
        var parentId = component.get("v.recordId");
        var modalBody;
        $A.createComponent("c:ccp_NewAlert", {
            "parentId" : component.get("v.recordId"),
            "sObjectName" : component.get("v.sObjectName")
        },
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                       header: "Create New Alert",
                       body: modalBody, 
                       showCloseButton: true,
                       cssClass: "",
                       closeCallback: function() {
                        $A.get('e.force:refreshView').fire();
                       }
                   });
               }                               
           });
    },

    viewMoreAlerts : function (component) {
        var qty = component.get("v.pageRowQty");
        component.set("v.pageRowQty", qty+4);
    }
})