import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { dialogflowConfig } from "./env";

const SmallTalk = {
  _id: 2,
  name: 'Bot Test',
  avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=000000&name=TR'
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: 'Hi, I am the Bot Test',
        createdAt: new Date(),
        user: SmallTalk
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.showResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  showResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: SmallTalk
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'fff'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

export default App;