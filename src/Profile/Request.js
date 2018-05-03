import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class Request extends Component {
  render() {
    return (
      <div style={{ margin: '20px 20px', backgroundColor: 'white' }}>
        <div style={{ height: '45px', textAlign: 'left', padding: '10px 10px 0px 10px', backgroundColor: '#CFD8DC' }}>
          <span style={{ marginBottom: 5 }}>{this.props.createdAt}</span>
          <span style={{ float: 'right' }}>ID: #{this.props.requestId}</span><br />
          <span style={{ fontWeight: 400, paddingTop: 10 }}>Total Charge: ${this.props.totalPrice}, Quantity: {this.props.Quantity}</span>
        </div>
        <div style={{ height: '105px', textAlign: 'left', verticalAlign: 'bottom', padding: 10, fontWeight: 200 }}>
          <div style={{ height: '100px', display: 'inline-block' }}>
            <img style={{ alt: 'album_pic', maxHeight: '100%', maxWidth: '100%' }} src={this.props.albumPic} />
          </div>
          <div style={{ verticalAlign: 'top', display: 'inline-block' }}>
            <div style={{ verticalAlign: 'top' }}>
              <span style={{ marginLeft: 7, fontWeight: 400 }}>Album: Name</span>
              <br></br>
              <span style={{ marginLeft: 7 }}>Price: $123</span>
              <br></br>
              <span style={{ marginLeft: 7 }}>Sold By: Seller 123</span>
            </div>
            {this.props.children}
           </div>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Request);
