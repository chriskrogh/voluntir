import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
    '.MuiCheckbox-colorSecondary.Mui-checked': {
        color: 'green'
    }
});

function CustomCheckbox({ size, checked, onChange, label }) {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        size={size}
                        checked={checked}
                        onChange={onChange}
                    />
                }
                label={label}
            />
        </FormGroup>
    );
}

export default withStyles(styles)(CustomCheckbox);