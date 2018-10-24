({
    loadAlerts : function(component) {
        console.log('hi ' +component.get("v.alerts").length);
        component.set("v.qty", '');
        var getAlertsAction = component.get("c.getAlerts");
        getAlertsAction.setParams({ 
            sObjectType : component.get("v.sObjectName"),
            parentId    : component.get("v.recordId")
        });
        getAlertsAction.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.alerts" , response.getReturnValue());
                this.updateAlertsQty(component);
            } else {
                var toast = $A.get("e.force:showToast");
                toast.setParams({
                    "title" :"Error!",
                    "message" : "Alerts can't load. Maybe try reloading the page?"
                });
                toast.fire();
            }
        });
        $A.enqueueAction(getAlertsAction);
    },

    updateAlertsQty : function(component) {
        var alerts = component.get("v.alerts");
        component.set("v.qty", alerts.length);
    }
})
