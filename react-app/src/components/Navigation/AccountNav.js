import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/session";
import { useListModal } from "../../context/ListModal";
import AddFunds from "../AddFundsModal/AddFunds"
import { Modal } from "../../context/Modal";

const AccountNav = () => {
  const { bool, setBool } = useListModal();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const history = useHistory();
  const portfolio = useSelector((state) => state.portfolio.portfolio);

  useEffect(() => {
    let fin = user?.cash;

    portfolio?.map((p) => {
      fin += p.purchase_price * p.quantity;
    });

    setAmount(fin?.toFixed(2));
  }, [portfolio, user?.cash]);

  const logoutUser = async () => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <div className="account-name">{user?.username}</div>
      <div className="portfolio-details">
        <div className="portfolio-info">
          <h3 className="account-value">${Number(amount).toLocaleString()}</h3>
          <div className="portfolio-value">Total Investment</div>
        </div>
        <div className="avail-cash">
          <h3 className="account-value">${user?.cash.toLocaleString()}</h3>
          <div className="portfolio-value">Available Cash</div>
        </div>
      </div>
      <div className="account-links">
        <div
          className="account-link"
          onClick={() => {
            document.querySelector(".account-dropdown").classList.add("hidden");
            setBool(true);
          }}
        >
          <img
            className="settings-img"
            src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-dollar-money-currency-those-icons-fill-those-icons-1.png"
          />
          Add Funds
        </div>
        <div className="account-link" onClick={() => history.push("/about")}>
          <img
            className="settings-img"
            src="https://img.icons8.com/glyph-neue/64/ffffff/test-account.png"
          />
          About The Creators
        </div>
        <div
          className="account-link"
          onClick={() => history.push("/account/settings")}
        >
          <img
            className="settings-img"
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTY5LjI3MzExLDE0LjMzMzMzbC0zLjUxMzM1LDE4LjA4NDY0Yy01LjkwNjUzLDIuMjI3NTIgLTExLjMzMDQ2LDUuMzQ5ODcgLTE2LjA4MzAxLDkuMjUyMjhsLTE3LjM3MDc3LC01Ljk5MDg5bC0xNi43NDA4OSwyOC45NzQ2MWwxMy45MTM0MSwxMi4wOTM3NWMtMC41MzQ4NywzLjI4Mzk1IC0wLjgxMTg1LDYuMzI3MTcgLTAuODExODUsOS4yNTIyOGMwLDIuOTI5NSAwLjI4NTI4LDUuOTY3MTUgMC44MTE4NSw5LjI1MjI4djAuMDE0bC0xMy45MTM0MSwxMi4wOTM3NWwxNi43NDA4OSwyOC45NjA2MWwxNy4zNTY3NywtNS45NzY4OWM0Ljc1Mjk5LDMuOTA0NTQgMTAuMTg5MTksNy4wMDk0OCAxNi4wOTcsOS4yMzgyOGwzLjUxMzM1LDE4LjA4NDY0aDMzLjQ1Mzc3bDMuNTEzMzUsLTE4LjA4NDY0YzUuOTEwMzksLTIuMjI4OTcgMTEuMzI4MjQsLTUuMzQ2MjggMTYuMDgzLC05LjI1MjI3bDE3LjM3MDc3LDUuOTkwODhsMTYuNzI2ODksLTI4Ljk2MDYxbC0xMy44OTk0MSwtMTIuMTA3NzVjMC41MzQ4NiwtMy4yODM5NSAwLjgxMTg1LC02LjMyNzE3IDAuODExODUsLTkuMjUyMjhjMCwtMi45MjA3MiAtMC4yNzg1NywtNS45NTk5OSAtMC44MTE4NSwtOS4yMzgyOHYtMC4wMTRsMTMuOTEzNDEsLTEyLjEwNzc1bC0xNi43NDA4OCwtMjguOTYwNjFsLTE3LjM1Njc4LDUuOTc2ODljLTQuNzUyOTgsLTMuOTA0NTMgLTEwLjE4OTE5LC03LjAwOTQ4IC0xNi4wOTcsLTkuMjM4MjhsLTMuNTEzMzUsLTE4LjA4NDY0ek04MS4wODY5MSwyOC42NjY2N2g5LjgyNjE3bDIuNzg1NDgsMTQuMzMzMzNsNy40NzQ2MSwyLjgyNzQ3YzQuNTA1NDMsMS42OTgwNiA4LjU1MzMsNC4wMjkyNyAxMi4wNjU3NSw2LjkxNDcxbDYuMTg2ODUsNS4wNjcwNmwxMy43NzM0NCwtNC43MzExMmw0LjkxMzA4LDguNDk2NDJsLTExLjAwMTk1LDkuNTc0MjJsMS4yNTk3Niw3Ljg4MDU0djAuMDE0YzAuNDM4MjMsMi42ODcwNiAwLjYyOTg5LDQuOTQxMjEgMC42Mjk4OSw2Ljk1NjdjMCwyLjAxNTUgLTAuMTkxNjQsNC4yNjkzMSAtMC42Mjk4OSw2Ljk1NjdsLTEuMjczNzYsNy44ODA1M2wxMS4wMDE5NSw5LjU3NDIybC00LjkxMzA5LDguNTEwNDJsLTEzLjc1OTQ0LC00Ljc0NTExbC02LjIwMDg0LDUuMDgxMDVjLTMuNTEyNDUsMi44ODU0NCAtNy41NDYzMyw1LjIxNjY1IC0xMi4wNTE3NSw2LjkxNDcyaC0wLjAxNGwtNy40NzQ2LDIuODI3NDdsLTIuNzg1NDgsMTQuMzMzMzNoLTkuODEyMThsLTIuNzg1NDgsLTE0LjMzMzMzbC03LjQ3NDYxLC0yLjgyNzQ3Yy00LjUwNTQ0LC0xLjY5ODA2IC04LjU1MzMsLTQuMDI5MjcgLTEyLjA2NTc1LC02LjkxNDcybC02LjE4Njg1LC01LjA2NzA2bC0xMy43NzM0NCw0LjczMTEybC00LjkxMzA5LC04LjQ5NjQybDExLjAxNTk1LC05LjU4ODIybC0xLjI3Mzc2LC03Ljg1MjU0di0wLjAxNGMtMC40MzE5NSwtMi42OTg3NCAtMC42Mjk4OCwtNC45NTkyMSAtMC42Mjk4OCwtNi45NzA3YzAsLTIuMDE1NSAwLjE5MTY1LC00LjI2OTMxIDAuNjI5ODgsLTYuOTU2N2wxLjI3Mzc2LC03Ljg4MDUzbC0xMS4wMTU5NSwtOS41NzQyMmw0LjkxMzA5LC04LjUxMDQybDEzLjc3MzQ0LDQuNzQ1MTJsNi4xODY4NSwtNS4wODEwNWMzLjUxMjQ1LC0yLjg4NTQ1IDcuNTYwMzIsLTUuMjE2NjUgMTIuMDY1NzUsLTYuOTE0NzFsNy40NzQ2MSwtMi44Mjc0N3pNODYsNTcuMzMzMzNjLTE1Ljc0MTc1LDAgLTI4LjY2NjY3LDEyLjkyNDkyIC0yOC42NjY2NywyOC42NjY2N2MwLDE1Ljc0MTc1IDEyLjkyNDkyLDI4LjY2NjY3IDI4LjY2NjY3LDI4LjY2NjY3YzE1Ljc0MTc1LDAgMjguNjY2NjcsLTEyLjkyNDkyIDI4LjY2NjY3LC0yOC42NjY2N2MwLC0xNS43NDE3NSAtMTIuOTI0OTIsLTI4LjY2NjY3IC0yOC42NjY2NywtMjguNjY2Njd6TTg2LDcxLjY2NjY3YzcuOTY1NTksMCAxNC4zMzMzMyw2LjM2Nzc1IDE0LjMzMzMzLDE0LjMzMzMzYzAsNy45NjU1OSAtNi4zNjc3NSwxNC4zMzMzMyAtMTQuMzMzMzMsMTQuMzMzMzNjLTcuOTY1NTksMCAtMTQuMzMzMzMsLTYuMzY3NzUgLTE0LjMzMzMzLC0xNC4zMzMzM2MwLC03Ljk2NTU5IDYuMzY3NzUsLTE0LjMzMzMzIDE0LjMzMzMzLC0xNC4zMzMzM3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
          />
          Settings
        </div>
        <div className="account-logout" onClick={logoutUser}>
          <img
            className="logout-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB2klEQVRIie2WSWtUQRSFT6kRArrTNoNCOmaRvW4d9kazjz9Bd/pHsosuxLVTq5B/IAQcNmYhBOJAcMCFqKAQu8PnwvO0KNKv6tmdrHKhqEfVueere3mTtBcFAbSAFx6t3YIeBV7yL14B47sN3Xm427tq0GoEjdeG33bgWQyIwPGBng4KmQKmkrUV4HlVVUX1dct7K0lOO/Wpg44BX4BPGd1fcI3ms72OlYBv27MzBHDHsls56Djwy6O2RYXgtr02gbF4b1+iXZA0IqkTQnhbe8qCCCG8kfRI0kF79wWf91zb5obx0PO5vgrgnTvYzrmVtNq6aUv7dxD4adHoEMGjlv6I19NW9zzvzxk2iJHEW5J0IBF9lHRY0oSktYzhE0nZiiVV7/AP8WJa8brnUzm3EMKZEMLZAvDpxHtb8LLn+QLD0qi8lvsqgONA1w/89KBEYMZeXWAyJ77pu/DeEMAP7LVUIp4Avjvh2gDQ6/b4mr4u65IuAltA73/ghvbscaFp8lUnAtwHThbkzETt3QKuND10ZTQHfLPRJnAHWABmgUMes8Bl4K6/RFV7m1W6DfwIsOg7Mxdd4AYFP36hwQEmJV2SNCepLemEtzYkvdaf5/RxCOF98/L2YgfjN6XQaiGbbNdyAAAAAElFTkSuQmCC"
          />
          Log Out
        </div>
      </div>
      {bool && (
        <Modal onClose={() => setBool(false)}>
          <AddFunds />
        </Modal>
      )}
    </>
  );
};

export default AccountNav;
