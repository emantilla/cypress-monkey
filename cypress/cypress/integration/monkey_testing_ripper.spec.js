describe('Wikipedia under monkeys', function() {
    it('visits wikipedia and survives monkeys', function() {
        cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada');
        cy.wait(1000);
        randomEvent(10);
    })
})
function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
		
		switch (getRandomInt(0, 4)){
			case 0:
				cy.get('a').then($links => {
					var randomLink = $links.get(getRandomInt(0, $links.length));
					if(!Cypress.dom.isHidden(randomLink)) {
						cy.wrap(randomLink).click({force: true});
						monkeysLeft = monkeysLeft - 1;
					}
					cy.wait(500);
					randomEvent(monkeysLeft);
				});
				break;
			case 1:
				cy.get('input[type="text"]').then($inputs => {
					var randomLink = $inputs.get(getRandomInt(0, $inputs.length))
					if(!Cypress.dom.isHidden(randomLink)) {
						cy.wrap(randomLink).type('asesino');
						monkeysLeft = monkeysLeft - 1;
					}
					cy.wait(500);
					randomEvent(monkeysLeft);
				});
				break;
			case 2:
				cy.get('button').then($buttons => {
					var randomLink = $buttons.get(getRandomInt(0, $buttons.length)).click();
					monkeysLeft = monkeysLeft - 1;
					cy.wait(500);
					randomEvent(monkeysLeft);
				});
				break;
				
			case 3:
				cy.get('select').then($selects => {
					var randomLink = $selects.get(getRandomInt(0, $selects.length))
					if(!Cypress.dom.isHidden(randomLink)) {
						cy.wrap(randomLink).find('option')
						.then($elm => $elm.get(getRandomInt(0, $elm.length)).setAttribute('selected', "selected"))
						.parent()
						.trigger('change')
						monkeysLeft = monkeysLeft - 1;
					}
					cy.wait(500);
					randomEvent(monkeysLeft);
				});
		}        
    }   
}