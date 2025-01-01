import { getStreamConversationSuccess, loadStreamMessages, resetAllStreamMessage, resetStreamMessage } from "@redux/stream-chat/actions";
import { connect } from "react-redux";
import { RubySmallIcon } from "src/icons";

const LiveStreamPage = () => {
  return (
    <section>
      <div>
        <div>
          <video />
          <button>...</button>
          <span>Live</span>
          <button>RPM</button>
        </div>
        <div>
          <button>Previous model</button>
          <nav>
            <button>camera</button>
            <button>Leave Stream</button>
            <button>Mic</button>
          </nav>
          <button>Next model</button>
        </div>
        <div>
          <div>
            <div>
              <span>
                Model Name
              </span>
              <button>Follow</button>
            </div>
            <span>1500 fans</span>
            <span>5 /min</span>
          </div>

          <div>
            <h2>Public stream details</h2>
            <div>
              <strong>Call time</strong>
              <span>6 minutes</span>
            </div>
            <div>
              <strong>Status</strong>
              <span>Live</span>
            </div>
            <div>
              <strong>Available</strong>
              <span><span>1000</span> Rubys</span>
            </div>
            <div>
              <h3>Awards</h3>
              <div>
                <img src="/static/awards/top-100.png" alt="" />
                <img src="/static/awards/top-10.png" alt="" />
                <img src="/static/awards/empty-award.png" alt="" />
                </div>
            </div>
          </div>
        </div>

      </div>

      <div>
        <header>
          <button>toggle</button>
          <button>Live Chat</button>
          <button>Person</button>
        </header>
        <div>
          <div>
            <div>1</div>
            <div>10</div>
            <div>50</div>
          </div>
          <div>
            <fieldset>
              <input type="checkbox" name="confirm-gift" id="confirm-gift" />
              <label htmlFor="confirm-gift">Confirm Purchase</label>
            </fieldset>
            <button>Send gift</button>
          </div>
        </div>
        <div>
          <div>
            <div>
              <strong>Alex Mills</strong>
            </div>
            <p>Doing well, trying to get more Rubys. What about you?</p>
          </div>
        </div>
        <div>
          <input type="text" />
          <button>Send</button>
        </div>
        <div>
          <header>Top Gifters</header>
          <div>
            <div>
              <p>1</p>
              <p>@fan1</p>
              <span>1000 <RubySmallIcon /></span>
            </div>
            <div>
              <p>1</p>
              <p>@fan1</p>
              <span>1000 <RubySmallIcon /></span>
            </div>
            <div>
              <p>1</p>
              <p>@fan1</p>
              <span>1000 <RubySmallIcon /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  ui: state.ui,
  ...state.streaming,
  ...state.performer.performerDetails,
  activeConversation: state.streamMessage.activeConversation,
  user: { ...state.user.current },
  loggedIn: state.auth.loggedIn
});

const mapDispatch = {
  loadStreamMessages,
  getStreamConversationSuccess,
  resetStreamMessage,
  resetAllStreamMessage
};

export default connect(mapStateToProps, mapDispatch)(LiveStreamPage);