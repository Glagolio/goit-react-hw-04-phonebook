import { Component } from 'react';
import InputName from './Input/InputName/InputName';
import LabelPhoneBook from './Label/Label';
import ButtonSubmit from './Button/ButtonSubmit';
import InputNumber from './Input/InputNumber/inputNumber';
import FormPhonebook from './Form/Form';

class Phonebook extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  clickOnBtnSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    return (
      <>
        <FormPhonebook onSubmit={this.clickOnBtnSubmit}>
          <LabelPhoneBook title="Name">
            <InputName value={this.state.name} onChange={this.handleChange} />
          </LabelPhoneBook>
          <LabelPhoneBook title="Number">
            <InputNumber
              value={this.state.number}
              onChange={this.handleChange}
            />
          </LabelPhoneBook>
          <ButtonSubmit text="Add contact" />
        </FormPhonebook>
      </>
    );
  }
}

export default Phonebook;
