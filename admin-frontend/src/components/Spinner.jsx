import { Box, styled } from '@mui/material';
import React from 'react';
import { BallTriangle } from 'react-loader-spinner'
import { TransparentBox } from '../StyledComponents/StyledButton';

function Spinner(props) {
    return (
        <TransparentBox>
            <BallTriangle
                height="100px"
                width="100px"
                radius={5}
                color="#4CCEAC"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </TransparentBox>
    );
}

export default Spinner;

export const TriangleBox = styled(BallTriangle)(() => ({
    width: "100%",
    height: "100%",
    margin: "auto"
}))