import React from 'react'
import { TextField, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { ControllerContext } from '../ControllerProvider'
import { FeedbackContext } from '../Utils/FeedbackContext'

const useStyles = makeStyles({
  skeleton: {
    minHeight: '55px'
  }
})

export default function Config (props) {
  const classes = useStyles()
  const { pushFeedback } = React.useContext(FeedbackContext)
  const { controller, updateController } = React.useContext(ControllerContext)
  const [data, setData] = React.useState({ ...controller })

  const save = async () => {
    try {
      await updateController(data)
      pushFeedback({ message: data.dev ? 'Controller details saved!' : 'Authenticated!', type: 'success' })
      props.onSave()
    } catch (e) {
      pushFeedback({ message: e.message, type: 'error' })
    }
  }

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value })
  }
  const handleUserChange = name => event => {
    setData({ ...data, user: { ...data.user, [name]: event.target.value } })
  }
  return (
    <React.Fragment>
      {data.dev && <Grid container spacing={2} >
        <Grid item xs={12} sm={6}>
          <TextField
            id='ip'
            label='IP'
            onChange={handleChange('ip')}
            value={data.ip}
            fullWidth
            className={classes.textField}
            margin='normal'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='port'
            label='Port'
            onChange={handleChange('port')}
            value={data.port}
            fullWidth
            className={classes.textField}
            margin='normal'
            variant='outlined'
          />
        </Grid>
      </Grid>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='email'
            label='Email'
            onChange={handleUserChange('email')}
            value={data.user.email}
            fullWidth
            className={classes.textField}
            margin='normal'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='password'
            label='Password'
            onChange={handleUserChange('password')}
            onKeyPress={(e) => e.key === 'Enter' && data.user.email && data.user.password ? save() : null}
            value={data.user.password}
            fullWidth
            type='password'
            className={classes.textField}
            margin='normal'
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Grid container justify='flex-end'>
        <Grid item>
          <Button onClick={save}>
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
