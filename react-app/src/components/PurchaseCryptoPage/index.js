import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PurchaseCryptoPage.css"
// import { getOneCryptocurrency, getAllCryptocurrency } from "../../store/purchaseCrypto";
import { getAllCrypto } from "../../store/crypto";

const PurchaseCryptoPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    // const crypto = useSelector(state => {
    //     return state.cryptocurrency.getOneCryptocurrency;
    // })

    const allCrypto = useSelector(state => {
        return state.crypto.getAllCrypto;
    })

    const history = useHistory();
    const { pathname } = history.location;

    const uniqueCryptoId = pathname.split("/")[2]
    let userId;

    // useEffect(() => {
    //     dispatch(getAllCrypto(uniqueCryptoId))
    // }, [dispatch, uniqueCryptoId])

    return (
        <>
            <h1>Hi</h1>
        </>
    )
}

export default PurchaseCryptoPage;
