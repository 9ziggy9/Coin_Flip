import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PurchaseCryptoPage.css"
// import { getOneCryptocurrency, getAllCryptocurrency } from "../../store/purchaseCrypto";
import { getOneCrypto } from "../../store/crypto";

const PurchaseCryptoPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const { pathname } = history.location;

    const singleCrypto = useSelector(state => {
        return state.crypto.getOneCrypto[0];
    })

    const uniqueCryptoId = pathname.split("/")[2]
    console.log(singleCrypto)
    let userId;

    useEffect(() => {
        dispatch(getOneCrypto(uniqueCryptoId))
    }, [dispatch, uniqueCryptoId])

    return (
        <div className="pageContainer">
            <div className="cryptoInfoContainer">
                <div className="cryptoName">{singleCrypto?.name}</div>
                <div className="cryptoPrice">${singleCrypto?.price.toLocaleString("en-US")}</div>
            </div>
        </div>
    )
}

export default PurchaseCryptoPage;
