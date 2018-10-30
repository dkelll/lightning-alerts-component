Account parentacct = new Account(name='Bob\'s Burgers');
insert parentacct;

// Create an empty list that will eventually hold the
// records I need to create
List<Alert__c> alerts = new List<Alert__c>();
Integer amountOfRecordsToCreate = 10;

// This is a list of picklist values used by the `Type__c` field.
// Since I create multiple records at a time I don't want all the
// picklist values to be the same, so I will grab a random value 
// from this list on each of the new records.
List<String> prioritiesPicklistValues = new List<String>{'High', 'Medium','Low'};


for(Integer i = 0; i<amountOfRecordsToCreate; i++) {
    // Create (instantiate) a new Alert and add values to
    // the Alert fields
    Alert__c alert = new Alert__c();
    alert.name='Blimey doubloon brig hogshead lookout';
    alert.Description__c='Coxswain overhaul hogshead ballast draught splice the main brace sutler lad. Nelsons folly hearties splice the main brace fire in the hole coffer jury mast Barbary Coast swab. Provost Nelsons folly topsail walk the plank pirate carouser gibbet Yellow Jack.';
    alert.Pinned__c=false;
    alert.Parent__c=parentacct.id;
    alert.sObjectType__c='Account';
            // Here is where I randomize the picklist values.
    alert.Type__c = prioritiesPicklistValues.get(Integer.valueOf(Math.floor(Math.random() * prioritiesPicklistValues.size())));
    
    // Add the new Alert into the list we created earlier so
    // we can insert the list when the for() loop is finished
    // doing its thang.
    alerts.add(alert);
}

// Let's party
insert alerts;