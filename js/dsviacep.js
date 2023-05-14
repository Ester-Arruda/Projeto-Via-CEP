//este arquivo fica no script do html
import * as formController from './controllers/form-controller.js';
import * as listController from './controllers/list-controller.js'
import * as modalController from './controllers/modal-controller.js'
import * as pageController from './controllers/page-controller.js'


//o html vai enxergar o que tiver dentro do init()
  //call funções, eventos, chamdas de elem para manip
formController.init()
listController.init()
modalController.init()
pageController.init()