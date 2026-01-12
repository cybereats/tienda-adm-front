import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { User, UsersResponse } from "../../../../models/user.model";
import { CConfirmDialog } from "../../ui/c-confirm-dialog/c-confirm-dialog";
import { CStatus } from "../../ui/c-status/c-status";
import { CPagination } from "../../ui/c-pagination/c-pagination";
import { CSearchBar } from "../../ui/c-search-bar/c-search-bar";
import { CFilterSelect, FilterOption } from "../../ui/c-filter-select/c-filter-select";
import { CResetFilters } from "../../ui/c-reset-filters/c-reset-filters";

import { UserService } from "../../../../services/user.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSearchBar, CFilterSelect, CResetFilters],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users implements OnInit {
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);

  users!: User[];
  totalPages: number = 0;
  totalElements: number = 0;


  roleFilterOptions: FilterOption[] = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'CLIENT', label: 'Cliente' }
  ];

  roleOptions = [
    { value: 'ADMIN', label: 'Admin', color: 'purple' },
    { value: 'CLIENT', label: 'Cliente', color: 'blue' },
  ];

  size: number = 10;
  currentPage: number = 1;

  filterText: string = '';
  filterRole: string = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? Number.parseInt(params['page']) : 1;
      this.size = params['size'] ? Number.parseInt(params['size']) : 10;
      this.filterText = params['text'] || '';
      this.filterRole = params['role'] || '';
      this.loadUsers();
    });
  }

  onSearch(text: string) {
    this.updateQueryParams({ text, page: 1 });
  }

  onRoleChange(role: string) {
    this.updateQueryParams({ role, page: 1 });
  }

  resetFilters() {
    this.filterText = '';
    this.filterRole = '';
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        text: null,
        role: null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  private updateQueryParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: newParams,
      queryParamsHandling: 'merge'
    });
  }

  loadUsers() {
    this.userService.search<UsersResponse>(
      this.currentPage,
      this.size,
      this.filterText,
      this.filterRole
    ).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages ?? 0;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  updateUserRole(user: User, newRole: "ADMIN" | "CLIENT") {
    const updatedUser = { ...user, role: newRole };
    console.log('Updating user role:', updatedUser);
    this.userService.put<User>(user.id.toString(), updatedUser).subscribe({
      next: (response) => {

        user.role = newRole;
        console.log('User role updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating user role:', error);
      }
    });
  }

  deleteUser(id: number) {
    const dialogRef = this.dialog.open(CConfirmDialog, {
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que quieres eliminar este usuario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id.toString()).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== id);
            this.totalElements--;
            console.log('User deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting user:', error);
          }
        });
      }
    });
  }
}
