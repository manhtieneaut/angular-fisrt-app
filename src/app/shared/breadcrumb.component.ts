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
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="breadcrumb-container">
      <div class="breadcrumb-current">
        <p>{{ currentLabel }}</p>
      </div>
    </nav>
  `,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadCrumb[] = [];
  currentLabel = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      if (this.breadcrumbs.length > 0) {
        this.currentLabel = this.breadcrumbs[this.breadcrumbs.length - 1].label;
      }
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const children = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
