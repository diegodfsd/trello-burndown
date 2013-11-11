var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	sprintSchema,
	Sprint;
	
sprintSchema = new Schema({
	name: { type: String, required: true, index: true },
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
	board:  { type: String, required: true },
	goal: [String],
	retrospective: [String],
	createAt: { type: Date, required: true, default: Date.now },
	active: { type: Boolean, default: true },
	doneListName: { type: String, required: true },
	workDays: [{ dates: { type: Date, required: true } }]
});

Sprint = mongoose.model('sprint', sprintSchema);

module.exports = Sprint;