import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ chats, handleReceivedUserChat, currentUser }) => {
  return (
    <Fragment>
      {chats.map(chat => {
        return (
          <ActionCableConsumer
            key={chat.id}
            channel={{ channel: 'UserChatsChannel', chat: chat.id }}
            onReceived={handleReceivedUserChat}
          />
        )
      })}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.user
  }
}

export default connect(mapStateToProps)(Cable);
