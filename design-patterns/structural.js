/**
 * Adapter design pattern example
 **/

// helper function
function xmlToJson(xml) {
  return JSON.stringify({ name: 'jhon', lastName: 'doe', age: 90 });
}

// Adaptee
class XMLApi {
  specificXMLRequest() {
    return `xml stuff`;
  }
}

// Target default domain specific behavior
class JSONApi {
  request() {
    // JSON format response
    return "{\"name\":\"jhon\",\"lastName\":\"doe\",\"age\":90}";
  }
}

// Adapter
class ApiAdapter extends JSONApi {
  constructor(adaptee) {
    super();
    this.adaptee = adaptee;
  }

  request() {
    // transform specific xml into json
    const xmlResult = this.adaptee.specificXMLRequest();
    return xmlToJson(xmlResult);
  }
}

// service which consumes the target Api (JSON) 
function clientService(api) {
  console.log(api.request());
}

// Implementation example
console.log('Service: I can work fine with JSON based APIs:');
const jsonApi = new JSONApi();
clientService(jsonApi);

console.log('');

console.log('Service: I do not understand the XML interface');
const xmlApi = new XMLApi();
console.log(xmlApi.specificXMLRequest());

console.log('');

console.log('Service: I can work with xml via the adapter');
const adapter = new ApiAdapter(xmlApi);
clientService(adapter);
