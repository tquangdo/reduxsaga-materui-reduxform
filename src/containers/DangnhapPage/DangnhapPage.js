import { Button, Card, CardContent, Typography, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { reduxFTextField } from '../../components/ReduxForm/ReduxF'
import * as authAction from '../../redux/actions/AuthAction'
import { LOGIN } from '../../redux/constants/ConfigConst'
import validate from '../TaskForm/Validate'
import dnPageStyles from './DangnhapPageStyles'
import { REDIRECT_AFTER_DANGKI } from '../../constants/CommonConstants'

class DangnhapPage extends Component {
  hamSubmitForm = data => {
    const { authActionCreators } = this.props
    const { email, password } = data
    const { dangnhap } = authActionCreators
    if (dangnhap) {
      dangnhap(email, password)
    }
  }
  render() {
    const { classes, invalid, submitting, handleSubmit, } = this.props
    return (
      <div className={classes.bckG}>
        <div>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(this.hamSubmitForm)}>
                <div>
                  <Typography variant='caption'>Đăng nhập(Đang test nên acc nào cũng OK!)</Typography>
                </div>
                <Field label='Email' placeholder='admin@gmail.com/admin'
                  fullWidth margin='normal' className={classes.textField}
                  name="email"
                  component={reduxFTextField}
                />
                <Field label='Password' type='password'
                  fullWidth margin='normal' className={classes.textField}
                  name="password"
                  component={reduxFTextField}
                />
                <Button
                  disabled={invalid || submitting}
                  variant='contained' color='primary' fullWidth type='submit' >
                  Đăng nhập
                </Button>
                <div>
                  <Link to={REDIRECT_AFTER_DANGKI + '/signup'} >
                    <Button>Đăng kí tài khoản</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div >
    )
  }
}

DangnhapPage.propTypes = {
  classes: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  authActionCreators: PropTypes.shape({
    dangnhap: PropTypes.func,
  }),
}
const withReduxForm = reduxForm({
  form: LOGIN,
  validate,
})
const mapDispatchToProps = dispatch => ({
  authActionCreators: bindActionCreators(authAction, dispatch)
})

export default compose(
  withStyles(dnPageStyles),
  connect(
    null,
    mapDispatchToProps
  ),
  withReduxForm,
)(DangnhapPage) 