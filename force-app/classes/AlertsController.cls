public with sharing class AlertsController {
@AuraEnabled
    public static List<Alert__c> getAlerts(String sObjectType, String parentId) {
        return [SELECT Id,CreatedDate, Name,Type__c,Pinned__c,Description__c 
        FROM Alert__c where sObjectType__c = :sObjectType and Parent__c = :parentId 
        ORDER BY CreatedDate DESC ];
    }
}