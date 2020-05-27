import optionsStorage from '../options/options-storage'

// tslint:disable-next-line: no-unnecessary-type-assertion
const nameField = document.querySelector('#inputname') as null | HTMLInputElement

// tslint:disable-next-line: no-unnecessary-type-assertion
const userAgreeButton = document.querySelector('#wc_agree1') as null | HTMLButtonElement

optionsStorage
  .getAll()
  .then((response) => {
    if (nameField !== null) {
      nameField.value = response.username
    }
    if (userAgreeButton !== null && response.autoAcceptUserAgreement !== false) {
      userAgreeButton.click()
    }
  })
  .catch()
