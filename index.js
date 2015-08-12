import {
  GraphQLList,
  GraphQLObjectType,
} from 'graphql'

String.prototype.toUnderscore = function(){
  return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

export default class BookshelfType extends GraphQLObjectType {
  constructor (config) {
    let fields = config.fields;
    let _this;
    config.fields = function() {
      return fields.call(null, _this);
    }
    super(config);
    _this = this;
  }

  static collection (aCollection) {
    if ('then' in aCollection)
      return aCollection.then((c) => c.models);
    else
      return aCollection.models;
  }

  belongsTo (options) {
    options.resolve = (modelInstance, params, source, fieldASTs) => {
      return modelInstance.related(fieldASTs.name.value.toUnderscore()).fetch();
    };
    return options;
  }

  hasMany (options) {
    let passBuilder = options.resolve;
    options.resolve = (modelInstance, params, source, fieldASTs) => {
      let passFn;
      if (passBuilder)
        passFn = function(qb) { passBuilder(qb, modelInstance, params, source, fieldASTs) };
      let fieldName = fieldASTs.name.value.toUnderscore();
      let loadOptions = {};
      loadOptions[fieldName] = passFn;
      return modelInstance.load(loadOptions).then(
        (model) =>
          this.constructor.collection(
            model.related(fieldName)
          )
      );
    };
    return options;
  }

  attr (options) {
    options.resolve = (modelInstance, params, source, fieldASTs) => {
      return modelInstance.get(fieldASTs.name.value.toUnderscore());
    }
    return options;
  }
}
