import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'List',
      icon: 'pi pi-fw pi-list',
      command: () => {
        this.router.navigateByUrl('list');
      },
    },
    {
      label: 'Recipes',
      icon: 'pi pi-fw pi-book',
      command: () => {
        this.router.navigateByUrl('recipes');
      },
    },
    {
      label: 'Money',
      icon: 'pi pi-fw pi-money-bill',
      command: () => {
        this.router.navigateByUrl('money');
      },
    },
  ];

  activeItem = this.items[0];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
