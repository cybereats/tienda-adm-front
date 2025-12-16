import { Component, OnInit } from '@angular/core';
import { Computer } from '../../../../models/computer.model';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CComputerCard } from '../../ui/c-computer-card/c-computer-card';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CPopup } from '../../ui/c-popup/c-popup';

@Component({
  selector: 'app-computers',
  standalone: true,
  imports: [CPagination, CComputerCard, RouterLink, CSearchBar, CFilterSelect, MatDialogModule],
  templateUrl: './computers.html',
  styleUrl: './computers.scss',
})
export class Computers implements OnInit {
  computers: Computer[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    label: `PC-${(i + 1).toString().padStart(2, '0')} ${['Gamer', 'Workstation', 'Standard', 'Streaming', 'Office'][Math.floor(Math.random() * 5)]}`,
    slug: `pc-${(i + 1).toString().padStart(2, '0')}-${['gamer', 'workstation', 'standard', 'streaming', 'office'][Math.floor(Math.random() * 5)]}`,
    runtime: Math.floor(Math.random() * 500),
    specs: [
      'RTX 3060, i5 12400F, 16GB RAM',
      'RTX 4090, i9 13900K, 64GB RAM',
      'GTX 1660, i3 10100, 8GB RAM',
      'RTX 3070, i7 11700, 32GB RAM',
      'RTX 4080, Ryzen 9 7900X, 64GB RAM',
      'GTX 1650, Ryzen 5 5600, 16GB RAM'
    ][Math.floor(Math.random() * 6)],
    workingSince: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('es-ES'),
    image: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop'
    ][Math.floor(Math.random() * 5)],
    categoryPC: ['Gaming', 'Workstation', 'Standard', 'Streaming', 'Office'][Math.floor(Math.random() * 5)]
  }));

  categoryFilterOptions: FilterOption[] = [
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Workstation', label: 'Workstation' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Streaming', label: 'Streaming' },
    { value: 'Office', label: 'Office' }
  ];

  itemsPerPage: number = 12;
  currentPage: number = 1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = Number.parseInt(params['page']);
      } else {
        this.currentPage = 1;
      }
    });
  }

  get paginatedComputers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.computers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.computers.length / this.itemsPerPage);
  }

  openCreateDialog(): void {
    const newComputer: Computer = {
      id: 0,
      label: '',
      slug: '',
      runtime: 0,
      specs: '',
      workingSince: '',
      image: '',
      categoryPC: ''
    };

    const dialogRef = this.dialog.open(CPopup, {
      width: '500px',
      data: { mode: 'create', data: newComputer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Create dialog closed with result:', result);
        // Here you would typically call a service to save the new computer
        // For now, we'll just add it to the local array
        result.id = this.computers.length + 1; // Assign a new ID
        this.computers.unshift(result); // Add to the beginning of the array
      }
    });
  }

  openEditDialog(computer: Computer): void {
    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '500px',
      data: { mode: 'edit', data: { ...computer } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Edit dialog closed with result:', result);
        // Here you would typically call a service to update the computer
        // For now, we'll just update the item in the local array
        const index = this.computers.findIndex(c => c.id === result.id);
        if (index > -1) {
          this.computers[index] = result;
        }
      }
    });
  }

  openDeleteDialog(computer: Computer): void {
    const dialogRef = this.dialog.open(CPopup, {
      width: '400px',
      data: { mode: 'delete', data: computer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete dialog confirmed for computer:', computer);
        // Here you would typically call a service to delete the computer
        // For now, we'll just remove it from the local array
        this.computers = this.computers.filter(c => c.id !== computer.id);
      }
    });
  }
}
