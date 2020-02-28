const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

router.get('/', (req, res) => res.json(members));
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
		if (found) {
			res.json(members.filter(member => member.id === parseInt(req.params.id)));
		}else{
			res.status(400).json({msg: "No data match."});
		}
});

router.post('/', (req, res) => {
	const newMember = {
		id: uuid.v4(),
		name: req.body.name,
		email: req.body.email
	}

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({msg: "Please Enter all data."});
	}

	members.push(newMember);
	res.redirect('/');
	//res.send(members);
});

router.put('/:id', (req, res) => {

	const updMember = req.body;
	members.forEach(member => {
		if (member.id === parseInt(req.params.id)) {
			member.name = updMember.name ? updMember.name : member.name;
			member.email = updMember.email ? updMember.email : member.email;
			res.json({msg: "Member Updated.", member});
		}else{
			res.status(400).json({msg: "No Data Found for Update."});
		}
	});
});

router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		res.json({msg: "Member deleted.",
				 members: members.filter(member => member.id !== parseInt(req.params.id))
		});
	}else{
		res.json({msg: "no member found."});
	}
});

module.exports = router;