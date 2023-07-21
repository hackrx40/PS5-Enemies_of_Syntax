import React from 'react'
import styled from '@emotion/styled';

import { Box } from '@mui/system';
import TransactionCustomer from "../../components/home/TransactionCustomer";

const Transactions = () => {
    
    const ComponentWrapper = styled(Box)({
        marginTop: "10px",
        paddingBottom: "10px",
    });
    return (
        <div>
            <ComponentWrapper>
                <TransactionCustomer />
            </ComponentWrapper>
        </div>
    )
}

export default Transactions