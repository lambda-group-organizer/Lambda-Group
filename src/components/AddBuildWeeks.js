import React from 'react';
import {Form, Button, Input, FormField} from 'semantic-ui-react';

const AddBuildWeek = props => {
  const addBuildWeek = e => {
    e.preventDefault();
      console.log('hello testing this@!');
  };
  return (
    <>
      <Form onSubmit={e => addBuildWeek(e)}>
        <Form.Field>
          <Input label="name" placeholder="build week ... ?" />
        </Form.Field>
        <Button type="submit" color="green">
          test
        </Button>
      </Form>
    </>
  );
};

export default AddBuildWeek;
