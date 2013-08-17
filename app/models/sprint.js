var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	sprintSchema,
	Sprint;
	
sprintSchema = new Schema({
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	board:  { type: String, required: true },
	name: { type: String, required: true },
	startAt: { type: Date, required: true },
	endAt: { type: Date, required: true },
	goal: String,
	retrospective: String,
	createAt: { type: Date, required: true, default: Date.now },
	active: { type: Boolean, default: true }
});

Sprint = mongoose.model('sprint', sprintSchema);

module.exports = Sprint;