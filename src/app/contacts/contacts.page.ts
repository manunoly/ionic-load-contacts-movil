import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Contacts } from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  letter = "a";
  query;
  dataC;
  data = [
    {
      displayName: "nombre 1",
      phoneNumbers: [
        {
          value: "593987969776"
        },
        {
          value: "0987969776"
        }
      ],
      emails: [
        {
          value: "manunoly@gmail.com"
        },
        {
          value: "email222@gmail.com"
        }
      ],
      photos: "null"
    },
    {
      displayName: "nombre 2",
      phoneNumbers: [
        {
          value: "0909809809"
        },
        {
          value: "0909809809"
        }
      ],
      emails: [
        {
          value: "ianaortega7@gmail.com"
        },
        {
          value: "email2@gmail.com"
        }
      ],
      photos: "null"
    }
  ];

  constructor(private platform: Platform, private contacts: Contacts) {
    this.search();
  }


  ngOnInit() {
  }
  
  search() {
    if (!this.platform.is('cordova')) {
      this.dataC = this.data;
      return;
    }
    this.contacts.find(['*'])
      .then(data => {
        this.dataC = data;
      })
      .catch(error => {
        alert("error cargando Contactos" + JSON.stringify(error));
      });
  }

  filterContacts(datos: Array<any>) {
    if (this.query != undefined && this.query != null && this.query != '')
      return datos.filter(
        x =>
          x &&
          x.displayName &&
          x.displayName.toLowerCase().includes(this.query.toLowerCase())
      )
        .slice(0, 100);
    if (this.letter)
      return datos
        .filter(
          x => x && x.displayName && x.displayName.toLowerCase().startsWith(this.letter)
        )
        .slice(0, 100);
  }

}
