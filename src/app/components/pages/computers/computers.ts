import { Component, OnInit, inject } from '@angular/core';
import { Computer, ComputerResponse } from '../../../../models/computer.model';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CComputerCard } from '../../ui/c-computer-card/c-computer-card';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CPopup } from '../../ui/c-popup/c-popup';
import { ComputerService } from '../../../../services/computer.service';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [CPagination, CComputerCard, CSearchBar, CFilterSelect, MatDialogModule, MatSnackBarModule],
  templateUrl: './computers.html',
  styleUrl: './computers.scss',
})
export class Computers implements OnInit {
  computerService = inject(ComputerService);

  computers: Computer[] = [];
  totalPages: number = 0;
  totalElements: number = 0;

  categoryFilterOptions: FilterOption[] = [
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Workstation', label: 'Workstation' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Office', label: 'Office' }
  ];

  size: number = 10;
  currentPage: number = 1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? Number.parseInt(params['page']) : 1;
      this.size = params['size'] ? Number.parseInt(params['size']) : 10;
      this.loadComputers();
    });
  }

  loadComputers(): void {
    this.computerService.getAll<ComputerResponse>(this.currentPage, this.size).subscribe({
      next: (response: ComputerResponse) => {
        this.computers = response.data;
        this.totalPages = Math.ceil(response.totalElements / this.size);
        this.totalElements = response.totalElements;
        console.log(this.computers);
      },
      error: (error) => {
        console.error('Error fetching computers:', error);
      }
    });
  }

  openCreateDialog(): void {
    const newComputer: Computer = {
      id: 0,
      label: '',
      slug: '',
      runtime: 0,
      specs: '',
      workingSince: new Date().toLocaleDateString(),
      image: '',
      // Default empty category, user will provide name
      categoryPCResponse: { id: 0, label: '', slug: '' }
    };

    // We pass 'categoryName' in the data so CPopup renders an input for it.
    // We EXCLUDE 'category' object so CPopup doesn't try to render it.
    const dialogData = {
      ...newComputer,
      categoryName: ''
    };

    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '500px',
      data: {
        mode: 'create',
        data: dialogData,
        title: 'Computero',
        excludedFields: ['slug', 'categoryPCResponse', 'workingSince', 'runtime']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 1. Generate Computer Slug
        const computerSlug = this.computerService.generateSlug(result.label);

        // 2. Extract Category Name and fetch valid Category
        const categoryName = result.categoryName;
        const categorySlug = this.computerService.generateSlug(categoryName);
        console.log('Category slug:', categorySlug);

        this.computerService.getCategoryBySlug(categorySlug).subscribe({
          next: (fetchedCategory) => {
            console.log('Category fetched:', fetchedCategory);

            // 3. Compose final computer with fetched category
            const computerToCreate = {
              ...newComputer,
              ...result,
              slug: computerSlug,
              // FIX 1: Send Date in YYYY-MM-DD format
              workingSince: new Date().toISOString().split('T')[0],
              // FIX 2: Rename field to match Backend DTO
              categoryPCRequest: fetchedCategory
            };

            // Remove the incorrect field from the spread operator
            delete (computerToCreate as any).categoryPCResponse;
            // Also remove categoryName which comes from result (if it wasn't removed before, though result shouldn't have it if control usage is separate)
            // Actually result comes from dialog, which has categoryName.
            delete (computerToCreate as any).categoryName;

            (computerToCreate as any).id = null;

            // 4. Send POST
            this.computerService.post<Computer>(computerToCreate).subscribe({
              next: (createdComputer) => {
                console.log('Computer created:', createdComputer);
                this.loadComputers();
              },
              error: (error) => {
                console.error('Error creating computer:', error);
              }
            });
          },
          error: (err) => {
            console.error('Category not found for slug:', categorySlug, err);
          }
        });

      }
    });
  }

  openEditDialog(computer: Computer): void {
    const dialogData = {
      ...computer,
      categoryName: computer.categoryPCResponse?.label || ''
    };

    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '500px',
      data: {
        mode: 'edit',
        data: dialogData,
        title: 'Computero',
        excludedFields: ['slug', 'categoryPCResponse', 'workingSince', 'runtime']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Computers: Edit dialog closed. Result:', result);
      if (result) {
        const categoryName = result.categoryName;
        const categorySlug = this.computerService.generateSlug(categoryName);

        this.computerService.getCategoryBySlug(categorySlug).subscribe({
          next: (fetchedCategory) => {
            const updatedComputer = {
              ...computer,
              ...result,
              categoryPCRequest: fetchedCategory
            };

            this.computerService.put<Computer>(computer.slug, updatedComputer).subscribe({
              next: (updatedComputer) => {
                console.log('Computer updated:', updatedComputer);
                this.loadComputers();
              },
              error: (error) => {
                console.error('Error updating computer:', error);
              }
            });
          },
          error: (err) => {
            console.error('Category not found for slug:', categorySlug, err);
          }
        });
      }
    });
  }

  openDeleteDialog(computer: Computer): void {
    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '400px',
      data: {
        mode: 'delete',
        data: {
          ...computer,
          categoryPCResponse: computer.categoryPCResponse?.label || ''
        },
        title: 'Computero'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Computers: Delete dialog closed. Result:', result);
      if (result) {
        // Use slug if typical for this API, otherwise ID. 
        // Given the PUT error explicitly checked path vs body slug, DELETE likely uses slug too.
        this.computerService.delete(computer.slug || computer.id.toString()).subscribe({
          next: () => {
            console.log('Computer deleted:', computer);
            this.loadComputers(); // Reload the list
          },
          error: (error) => {
            console.error('Error deleting computer:', error);
          }
        });
      }
    });
  }
}
