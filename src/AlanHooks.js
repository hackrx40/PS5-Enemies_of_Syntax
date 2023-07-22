import alanBtn from '@alan-ai/alan-sdk-web';
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import { ThemeContextColor } from './App';

const commands = {
    Open_events: "open-transactions",
    Change_beaches: "open-points"
}
const AlanHooks = () => {
    const navigate = useNavigate();
    const [alanInstance, setins] = useState();
    // const { setShowCartItems } = useCart()

    const OpenEve = useCallback(async () => {
        alanInstance.playText("Opening The page")
        navigate("/profile/transactions")
    }, [alanInstance, navigate])

    const ChangeBeac = useCallback(async () => {
        alanInstance.playText("Opening coupons")
        navigate("/CashKudos")
    }, [alanInstance, navigate])



    useEffect(() => {
        window.addEventListener(commands.Open_events, OpenEve)
        window.addEventListener(commands.Change_beaches, ChangeBeac)

        return () => {
            window.removeEventListener(commands.Change_beaches, OpenEve)
            window.removeEventListener(commands.Change_beaches, ChangeBeac)
        }
    }, [alanInstance, OpenEve, ChangeBeac])

    useEffect(() => {

        if (alanInstance) return;
        setins(
            alanBtn({
                key: "31954564391eb3c724554cef916b11262e956eca572e1d8b807a3e2338fdd0dc/stage",
                onCommand: ({ command }) => {
                    window.dispatchEvent(new CustomEvent(command))

                    // if (commandData.command === commands.Open_cart) {
                    // 
                    // OpenCart()
                    // }
                }
            })
        )
    }, [alanInstance]);
    return null
}

export default AlanHooks