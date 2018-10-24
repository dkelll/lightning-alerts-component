({
    handleCancel : function(component) {
        component.find("overlayLib").notifyClose();
    },

    handleDelete: function(component,event,handler) {
        var title = "Oh no!";
        var message = "Something went wrong. Please try deleting again.";
        var variant = "error"; 

        component.find("recordHandler").deleteRecord(function(deleteResult) {
            
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                // record is deleted
                title = "Deleted!";
                message = "The Alert has been successfully deleted";
                variant = "success";
                console.log('hello');

            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        });


        component.find("overlayLib").notifyClose();
    }
})
