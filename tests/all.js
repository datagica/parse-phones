const chai = require('chai')
chai.use(require('chai-fuzzy'))
const expect = chai.expect

const parsePhones = require("../lib/index")

describe('@datagica/parse-phones', () => {

	describe('matching phone numbers', () => {

		it('should work with international numbers', (done) => {

			// TODO FIXME our regex fail to parse "19-49-89-636-48018"

			var phoneNumbers = [
        {
          input: `31-12-2014`, // because probably not a phone number
          output: []
        },
        {
          input: `12-31-2014`, // because probably not a phone number
          output: []
        },
        {
          input: `2014-31-12`, // because probably not a phone number
          output: []
        },
        {
					input: `2014-12-31`, // because probably not a phone number
					output: []
        },
				{
					input: `754-3010`,
					output: [
						{
							"ngram": "754-3010",
							"value": {
								"id": "phone-7543010",
								"label": {
									"en": "754-3010"
								},
								"phone": "754-3010",
								"numeric": "7543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 8,
								"end": 16
							}
						}
					]
				}, {
					input: `+1-541-754-3010`,
					output: [
						{
							"ngram": "+1-541-754-3010",
							"value": {
								"id": "phone-+15417543010",
								"label": {
									"en": "+1-541-754-3010"
								},
								"phone": "+1-541-754-3010",
								"numeric": "+15417543010",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 15,
								"end": 30
							}
						}
					]
				}, {
					input: `1-541-754-3010`,
					output: [
						{
							"ngram": "1-541-754-3010",
							"value": {
								"id": "phone-15417543010",
								"label": {
									"en": "1-541-754-3010"
								},
								"phone": "1-541-754-3010",
								"numeric": "15417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 14,
								"end": 28
							}
						}
					]
				}, {
					input: `(541) 754-3010`,
					output: [
						{
							"ngram": "(541) 754-3010",
							"value": {
								"id": "phone-7543010",
								"label": {
									"en": "(541)754-3010"
								},
								"phone": "(541)754-3010",
								"numeric": "7543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 2,
								"begin": 14,
								"end": 28
							}
						}
					]
				}, {
					input: `001-541-754-3010`,
					output: [
						{
							"ngram": "001-541-754-3010",
							"value": {
								"id": "phone-0015417543010",
								"label": {
									"en": "001-541-754-3010"
								},
								"phone": "001-541-754-3010",
								"numeric": "0015417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 16,
								"end": 32
							}
						}
					] // bug!!
				}, {
					input: `191 541 754 3010`,
					output: [
						{
							"ngram": "191 541 754 3010",
							"value": {
								"id": "phone-1915417543010",
								"label": {
									"en": "1915417543010"
								},
								"phone": "1915417543010",
								"numeric": "1915417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 4,
								"begin": 16,
								"end": 32
							}
						}
					]
				}, {
					input: `+49-89-636-48018`,
					output: [
						{
							"ngram": "+49-89-636-48018",
							"value": {
								"id": "phone-+498963648018",
								"label": {
									"en": "+49-89-636-48018"
								},
								"phone": "+49-89-636-48018",
								"numeric": "+498963648018",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 16,
								"end": 32
							}
						}
					]
				}, {
					input: `+1-(800)-555-2468`,
					output: [
						{
							"ngram": "+1-(800)-555-2468",
							"value": {
								"id": "phone-+15552468",
								"label": {
									"en": "+1-(800)-555-2468"
								},
								"phone": "+1-(800)-555-2468",
								"numeric": "+15552468",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 17,
								"end": 34
							}
						}
					]
				}, {
					input: `19-49-89-636-48018`,
					output: [
						{
							"ngram": "19-49-89-636-48018",
							"value": {
								"id": "phone-19498963648018",
								"label": {
									"en": "19-49-89-636-48018"
								},
								"phone": "19-49-89-636-48018",
								"numeric": "19498963648018",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 18,
								"end": 36
							}
						}
					]
				}, {
					input: `06 99 99 99 99`,
					output: [
						{
							"ngram": "06 99 99 99 99",
							"value": {
								"id": "phone-0699999999",
								"label": {
									"en": "0699999999"
								},
								"phone": "0699999999",
								"numeric": "0699999999",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 5,
								"begin": 14,
								"end": 28
							}
						}
					]
				}, {
					input: `0699999999`,
					output: [
						{
							"ngram": "0699999999",
							"value": {
								"id": "phone-0699999999",
								"label": {
									"en": "0699999999"
								},
								"phone": "0699999999",
								"numeric": "0699999999",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 10,
								"end": 20
							}
						}
					]
				}, {
					input: `+33655555555`,
					output: [
						{
							"ngram": "+33655555555",
							"value": {
								"id": "phone-+33655555555",
								"label": {
									"en": "+33655555555"
								},
								"phone": "+33655555555",
								"numeric": "+33655555555",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 1,
								"begin": 12,
								"end": 24
							}
						}
					]
				}, {
					input: `1999-2001`,
					output: []
				}, {
					input: `19701999`,
					output: []
				}, {
					input: `19702020`,
					output: []
				}, {
					input: `1970-198`,
					output: []
				}, {
					input: `1970-980`,
					output: []
				}, {
					input: `1970198`,
					output: []
				}, {
					input: `1970980`,
					output: []
				}, {
					input: `20142015`,
					output: []
				}, {
					input: `2014-2015`,
					output: []
				}, {
					input: `2014-015`,
					output: []
				}, {
					input: `2014-201`,
					output: []
				}, {
					input: `2014015`,
					output: []
				}, {
					input: `2014201`,
					output: []
				}
			]
			/* ,{
        input: `+33 (0) 6 48 14 88 65`,
        output: [{
          phone: '+33 0 6 48 14 88 65',
          numeric: '33655555555',
          country: 'France',
          code: 'FR'
        }]
      }*/

			Promise.all(phoneNumbers.map(test => {
				return parsePhones(test.input).then(output => {
					//console.log("phone: " + JSON.stringify(output, null, 2))
					expect(output).to.be.like(test.output)
					return Promise.resolve(true)
				})
			})).then(ended => {
				console.log(`test ended`)
				done()
				return true
			}).catch(exc => {
				console.error(exc)
			})

		})

		it('should work with numbers mixed with text', (done) => {

			// TODO FIXME our regex fail to parse "19-49-89-636-48018"

			var phoneNumbers = [
				{
					input: `lorem ipsum dolor:754-3010 sit amet`,
					output: [
						{
							"ngram": "754-3010",
							"value": {
								"id": "phone-7543010",
								"label": {
									"en": "754-3010"
								},
								"phone": "754-3010",
								"numeric": "7543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 3,
								"begin": 26,
								"end": 34
							}
						}
					]
				}, {
					input: `lorem ipsum dolor:+1-541-754-3010 sit amet`,
					output: [
						{
							"ngram": "+1-541-754-3010",
							"value": {
								"id": "phone-+15417543010",
								"label": {
									"en": "+1-541-754-3010"
								},
								"phone": "+1-541-754-3010",
								"numeric": "+15417543010",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 3,
								"begin": 33,
								"end": 48
							}
						}
					]
				}, {
					input: `lorem ipsum 32 dolor :1-541-754-3010 sit amet`,
					output: [
						{
							"ngram": "1-541-754-3010",
							"value": {
								"id": "phone-15417543010",
								"label": {
									"en": "1-541-754-3010"
								},
								"phone": "1-541-754-3010",
								"numeric": "15417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 5,
								"begin": 36,
								"end": 50
							}
						}
					]
				}, {
					input: `lorem ipsum dolor_ (541) 754-3010 _ sit amet`,
					output: [
						{
							"ngram": "(541) 754-3010",
							"value": {
								"id": "phone-7543010",
								"label": {
									"en": "(541)754-3010"
								},
								"phone": "(541)754-3010",
								"numeric": "7543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 5,
								"begin": 33,
								"end": 47
							}
						}
					] // Bug!
				}, {
					input: `lorem ipsum dolor/001-541-754-3010/ sit amet`,
					output: [
						{
							"ngram": "001-541-754-3010",
							"value": {
								"id": "phone-0015417543010",
								"label": {
									"en": "001-541-754-3010"
								},
								"phone": "001-541-754-3010",
								"numeric": "0015417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 3,
								"begin": 34,
								"end": 50
							}
						}
					] // bug!!
				}, {
					input: `lorem ipsum dolor "191 541 754 3010" sit amet`,
					output: [
						{
							"ngram": "191 541 754 3010",
							"value": {
								"id": "phone-1915417543010",
								"label": {
									"en": "1915417543010"
								},
								"phone": "1915417543010",
								"numeric": "1915417543010",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 7,
								"begin": 35,
								"end": 51
							}
						}
					]
				}, {
					input: `lorem ipsum dolor(+49-89-636-48018) sit amet`,
					output: [
						{
							"ngram": "+49-89-636-48018",
							"value": {
								"id": "phone-+498963648018",
								"label": {
									"en": "+49-89-636-48018"
								},
								"phone": "+49-89-636-48018",
								"numeric": "+498963648018",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 3,
								"begin": 34,
								"end": 50
							}
						}
					]
				}, {
					input: `lorem ipsum dolor +1-(800)-555-2468 sit amet`,
					output: [
						{
							"ngram": "+1-(800)-555-2468",
							"value": {
								"id": "phone-+15552468", // TODO FIXME ok, this is a bug
								"label": {
									"en": "+1-(800)-555-2468"
								},
								"phone": "+1-(800)-555-2468",
								"numeric": "+15552468",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 4,
								"begin": 35,
								"end": 52
							}
						}
					]
				}, {
					input: `lorem ipsum dolor 19-49-89-636-48018 sit amet`,
					output: [
						{
							"ngram": "19-49-89-636-48018",
							"value": {
								"id": "phone-19498963648018",
								"label": {
									"en": "19-49-89-636-48018"
								},
								"phone": "19-49-89-636-48018",
								"numeric": "19498963648018",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 4,
								"begin": 36,
								"end": 54
							}
						}
					]
				}, {
					input: `lorem ipsum dolor 06 99 99 99 99 sit amet`,
					output: [
						{
							"ngram": "06 99 99 99 99",
							"value": {
								"id": "phone-0699999999",
								"label": {
									"en": "0699999999"
								},
								"phone": "0699999999",
								"numeric": "0699999999",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 8,
								"begin": 32,
								"end": 46
							}
						}
					]
				}, {
					input: `lorem ipsum dolor 0699999999 sit amet`,
					output: [
						{
							"ngram": "0699999999",
							"value": {
								"id": "phone-0699999999",
								"label": {
									"en": "0699999999"
								},
								"phone": "0699999999",
								"numeric": "0699999999",
								"extension": "national",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 4,
								"begin": 28,
								"end": 38
							}
						}
					]
				}, {
					input: `lorem ipsum dolor +33 6 55 55 55 55 sit amet`,
					output: [
						{
							"ngram": "+33 6 55 55 55 55",
							"value": {
								"id": "phone-+33655555555",
								"label": {
									"en": "+33655555555"
								},
								"phone": "+33655555555",
								"numeric": "+33655555555",
								"extension": "international",
								"keywords": {
									"en": [
										"phone", "cellphone", "cell phone", "phone number", "number"
									],
									"fr": ["numéro", "téléphone", "numéro de téléphone", "portable", "numéro de portable"]
								}
							},
							"score": 1,
							"position": {
								"sentence": 0,
								"word": 9,
								"begin": 35,
								"end": 52
							}
						}
					]
				}
			]

			Promise.all(phoneNumbers.map(test => {
				return parsePhones(test.input).then(output => {
					// console.log("phone: " + JSON.stringify(output, null, 2))
					expect(output).to.be.like(test.output)
					return Promise.resolve(true)
				})
			})).then(ended => {
				console.log(`test ended`)
				done()
				return true
			}).catch(exc => done(exc))

		})

		it(`shouldn't match non-phone numbers`, () => {})

	})
})
