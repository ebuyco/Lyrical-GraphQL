Lyrical-Graphql is an App that is written on Reactjs (currently 16.8.6) with interface components rendered primarily using ReactJS.

The back end is driven by MongoDB (currently version 5.5.11) with a custom ORM, RBAC and interface components.

The source was originally organised using "packages for everything" [(see:"Is packages for everything the solution on package,json file")].



**Module structure**

Each module within these namespaces contains a consistent structure (although there may be some slight variation depending on the size and purpose of the module).

|- index.js         Imports all submodules from the local namespace and exports them under the module name (todo - link to example)
|- actions      Includes any state-changing actions relevant to this module
|- routes 	    Includes the routes for any pages implemented by this module
|- _[stylesheets]_    [any stylesheets required by the module]
|- imports
   |- components    Any React component implemented by this model
   |- containers    Data containers for any React pages pages or components
   |- schemas       Any schemas required by this model
   |- mutation  If this module requires a central point of execution the data that push into micro service using mongolab
   |- queries  This is the data come from the root schema included on the field 

## Database implementation

Lyrical App uses MongoDB/Mongoose package for the database. Collections are wrapped in a custom model class  that provides validation and limited authentication. Secure code is run in Meteor methods but where possible these are abstracted away using a custom ValidatedMethod styled after the package.

All state changing actions should be encapsulated either in a validated method or an instance of the custom [class Action](module-core_Actions.Action.html).

The data model consists of eight main entities. Detailed information on the structure of each can be found in the respective schemas linked in below.

Please note:

- all entities are referred to in the plural
- models are implemented as basic Mongoose collections with functionality added onto them.


## Database structure

The data model consists of eight main entities listed here in order of significance. 


## Models

At the core of the Lyrical app is a custom Object Relational-Mapping module that wraps around each of the Mongo collections and a custom Role Based Access Control package that handles methods and permissions.

## Mixins
