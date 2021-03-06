import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import axios from "axios";
import Loading from "./components/Loading";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere-bg.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/?include=contactTags.tag,contactDeals.deal,geoIps.geoAddress`,
        {
          headers: {
            "Api-Token":
              "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
          },
        }
      )
      .then((res) => {
        const users = res.data.contacts;
        const deals = res.data.deals;
        const geoIps = res.data.geoIps;
        const tags = res.data.tags;
        const contactTags = res.data.contactTags;
        let array = [];
        users.forEach((contact) => {
          let entry = {};
          let dealTotal = 0;
          let totalAmountOfDeals = 0;
          let tagArray = [];
          entry.id = contact.id;
          entry.firstName = contact.firstName;
          entry.lastName = contact.lastName;
          entry.contactTags = contact.contactTags;

          let geoAddressID = geoIps.filter(
            (element) => element.contact == contact.id
          )[0]?.geoaddrid;
          for (let n = 0; n < res.data.geoAddresses.length; n++) {
            if (geoAddressID === res.data.geoAddresses[n].id) {
              entry.location =
                res.data.geoAddresses[n].city +
                ", " +
                res.data.geoAddresses[n].country;
            }
          }

          let contactDeals = deals.filter(
            (element) => element.contact == contact.id
          );
          totalAmountOfDeals = contactDeals.length;
          if (contactDeals.length > 0) {
            entry.dealCurrency = deals[0].currency;
          }
          for (let i = 0; i < contactDeals.length; i++) {
            dealTotal += parseInt(contactDeals[i].value);
          }
          for (let n = 0; n < contactTags.length; n++) {
            if (contactTags[n].contact == contact.id) {
              for (let i = 0; i < contact.contactTags.length; i++) {
                if (contactTags[n].tag == tags[i].id) {
                  tagArray.push(tags[i].tag);
                }
              }
            }
          }
          entry.totalValue = dealTotal
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          entry.amountOfDeals = totalAmountOfDeals;
          entry.tagText = tagArray;
          array.push(entry);
          setRowData(array);
        });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            marginTop: "6rem",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Table rows={rowData} />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
