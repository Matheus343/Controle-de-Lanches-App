const mongoose = require('../config/database');

const AlunoSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        ra: { type: Number, required: true },
        foto: { type: String, required: true },
        
    }

)

module.exports = mongoose.model('Aluno', AlunoSchema);


/*
https://mongoosejs.com/docs/models.html
When you call mongoose.model() on a schema, Mongoose compiles a model for you.

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

The first argument is the singular name of the collection your model 
is for. Mongoose automatically looks for the plural, 
lowercased version of your model name. Thus, for the example above,
the model Tank is for the tanks collection in the database.
*/