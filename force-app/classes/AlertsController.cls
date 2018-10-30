public with sharing class AlertsController {
@AuraEnabled
    public static List<Alert__c> getAlerts(String sObjectType, String parentId) {
        return [SELECT Id,LastModifiedDate, Name,Type__c,Pinned__c,Description__c 
        FROM Alert__c where sObjectType__c = :sObjectType and Parent__c = :parentId 
        ORDER BY Pinned__c desc, lastmodifieddate DESC ];
    }

@AuraEnabled
    public static String toggleAlertPin(Alert__c alert){
        String status;
        if(alert == null) throw new AuraHandledException('No Alert found.');

        alert.Pinned__c = !alert.Pinned__c;
        try {
            update alert;
            status  = 'SUCCESS';
        } catch(Exception e) {
            throw new AuraHandledException('Oops! Couldn\'t update the Alert. Please try again.');
        }
        return status;
    }
}
