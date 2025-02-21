import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Company {
  id: number;
  name: string;
  address: string;
  businessType: string;
}

@Component({
  selector: 'app-company-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-entry.component.html',
  styleUrls: ['./company-entry.component.css']
})
export class CompanyEntryComponent {
  companyForm: FormGroup;
  companies: Company[] = [];
  editingCompany: Company | null = null;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      businessType: ['', Validators.required]
    });
  }

  addCompany(): void {
    if (this.companyForm.valid) {
      const newCompany: Company = {
        id: this.companies.length + 1,
        ...this.companyForm.value
      };
      this.companies.push(newCompany);
      this.companyForm.reset();
    }
  }

  editCompany(company: Company): void {
    this.editingCompany = company;
    this.companyForm.patchValue(company);
  }

  updateCompany(): void {
    if (this.companyForm.valid && this.editingCompany) {
      const index = this.companies.findIndex(c => c.id === this.editingCompany!.id);
      this.companies[index] = { ...this.editingCompany, ...this.companyForm.value };
      this.editingCompany = null;
      this.companyForm.reset();
    }
  }

  deleteCompany(company: Company): void {
    this.companies = this.companies.filter(c => c.id !== company.id);
  }

  cancelEdit(): void {
    this.editingCompany = null;
    this.companyForm.reset();
  }
}