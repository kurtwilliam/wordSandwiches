function getWords() {
	ajax({
		url: `http://proxy.hackeryou.com`, 
		type: 'GET',
		dataType: 'json',
		data:{
			reqUrl: "https://od-api.oxforddictionaries.com:443/api/v1/wordlist/en/lexicalCategory%3DVerb",
			xmlToJSON: "false",
			proxyHeaders:{
				"Accept": "application/json",
				"app_id": app_id,
				"app_key": app_key
			},
			params:{
				offset: offsetRando,
				word_length: this.props.wordLength,
				exact: false
			}
		}
		}).then((data) =>{
			console.log(data)
	});
}

getWords();