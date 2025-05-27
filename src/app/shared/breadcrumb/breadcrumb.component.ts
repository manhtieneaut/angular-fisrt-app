import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  currentLabel: string = '';
  fullPath: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        if (breadcrumbs.length > 0) {
          this.currentLabel = breadcrumbs[breadcrumbs.length - 1].label;
          this.fullPath = breadcrumbs.map(b => b.label).join(' > ');
          console.log('Breadcrumbs:', breadcrumbs);
        }
      });
    });

  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children = route.children;

    for (const child of children) {
    const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL) {
      url += `/${routeURL}`;
    }

    const label = child.snapshot.data['breadcrumb'];
    if (label) {
      breadcrumbs.push({ label, url });
    }

    this.createBreadcrumbs(child, url, breadcrumbs);
  }

  return breadcrumbs;

  }
}
