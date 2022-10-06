const logout = (req, res, next)=>{
    console.log(res.locals.user)
    	console.log(res.locals.admin)
	req.session.destroy((err) =>{
	    if (err) throw err
		console.log('disconnected')
		res.json({response:true})
	})
}

export default logout