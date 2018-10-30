/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 * 
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@isTest
private class AlertsController_Test {

    @TestSetup
    static void makeData(){
        Account acct = new Account(name='Bob\'s Burgers');
        insert acct;

        List<Alert__c> alerts = new List<Alert__c>();
        Integer amountOfRecordsToCreate = 4;

        List<String> prioritiesPicklistValues = new List<String>{'High', 'Medium','Low'};
        for(Integer i = 0; i<amountOfRecordsToCreate; i++) {
            Alert__c alert = new Alert__c();
            alert.name='Blimey doubloon brig hogshead lookout';
            alert.Description__c='Coxswain overhaul hogshead ballast draught splice the main brace sutler lad. Nelsons folly hearties splice the main brace fire in the hole coffer jury mast Barbary Coast swab. Provost Nelsons folly topsail walk the plank pirate carouser gibbet Yellow Jack.';
            alert.Pinned__c=false;
            alert.Parent__c=acct.Id;
            alert.sObjectType__c='Account';
            alert.Type__c = prioritiesPicklistValues.get(Integer.valueOf(Math.floor(Math.random() * prioritiesPicklistValues.size())));
            alerts.add(alert);
        }

        // Let's party
        insert alerts;
    }

    @isTest
    static void getAlertsTestSuccess() {
        // Setup
        List<Alert__c> alerts = new List<Alert__c>();
        String sObjectType = 'Account';
        Account parent = [SELECT Id, Name from Account limit 1];
        
        // Execute
        alerts = AlertsController.getAlerts(sObjectType,parent.Id);

        // Assert
        System.debug('Parent: ' +parent.name);
        System.debug('Alerts: ' +alerts.size());
        System.assertNotEquals(null, parent.Id);
        System.assertEquals(true, alerts.size() > 0);

        // Teardown
    }

    @isTest
    static void testToggleAlertPinWithNullAlert() {
        // Setup
        String result;

        // Execute
        try { result = AlertsController.toggleAlertPin(null); } 
        catch(AuraHandledException e) { result = e.getMessage(); }

        // Assertions
        System.assertEquals('Script-thrown exception', result);
    }

    @isTest
    static void testToggleAlertPinSuccess() {
        // Setup
        String result;
        makeData();
        Alert__c alert = [SELECT id, Pinned__c from Alert__c limit 1];

        // Execute
        try { result = AlertsController.toggleAlertPin(alert); } 
        catch(AuraHandledException e) { result = e.getMessage(); }

        // Assertions
        Alert__c updatedAlert = [SELECT id, Pinned__c from Alert__c where id =: alert.id ];
        System.assertEquals(true, updatedAlert.Pinned__c);
        System.assertEquals('SUCCESS', result);
    }
}