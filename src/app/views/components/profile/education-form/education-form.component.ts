import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Education } from 'src/app/shared/models/education';
import User from 'src/app/shared/models/user.model';
import { StoreUserService } from 'src/app/shared/services/store-user.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  addEducation,
  editEducation,
} from 'src/app/shared/store/user-store/actions';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.sass'],
})
export class EducationFormComponent implements OnInit {
  public user: User;
  public educationSelectedId: number;
  public showForm: boolean;
  public showSuccessMsg: boolean;
  public education: Education;
  public educationForm: FormGroup;
  public type: FormControl;
  public level: FormControl;
  public name: FormControl;
  public university: FormControl;
  public finishDate: FormControl;
  public levelOptions = {
    grado: [
      'grado',
      'diplomado',
      'licenciado',
      'ingeniero',
      'máster',
      'doctorado',
    ],
    fp: ['grado superior', 'grado medio'],
  };

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeToUserStore();

    this.type = new FormControl('', [Validators.required]);
    this.level = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);
    this.university = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(55),
    ]);

    this.finishDate = new FormControl('', [
      Validators.pattern(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])\/([1][9][3-9][0-9]|[2][0][012][0-9])/
      ),
      Validators.maxLength(10),
    ]);

    this.educationForm = this.formBuilder.group({
      type: this.type,
      level: this.level,
      name: this.name,
      university: this.university,
      finishDate: this.finishDate,
    });
  }

  onSubmit() {
    this.educationSelectedId == 0
      ? this.addEducation(this.educationForm.value)
      : this.editEducation();
    /* this.pushEducation(); */
    /*     this.userService.updateUser(this.user).subscribe((data) => { */
    /*     this.updateStoredUser(); */
    this.showForm = false;
    this.showSuccessMsg = true;
    /*     }); */
  }

  /*  updateStoredUser() {
    this.storeUserService.user = this.user;
  } */

  subscribeToUserStore() {
    this.store
      .select('usersApp')
      .subscribe((userResponse) => (this.user = userResponse.user));
  }

  addEducation(newLanguage) {
    this.store.dispatch(
      addEducation({
        education: newLanguage,
      })
    );
  }

  editEducation() {
    this.store.dispatch(
      editEducation({
        id: this.educationSelectedId,
        editedEducation: this.educationForm.value,
      })
    );
  }

  recieveEducationEvent($event) {
    this.educationSelectedId = $event;
    if ($event > 0) {
      this.setFormValues();
    }
    this.showForm = true;
    this.showSuccessMsg = false;
  }

  setFormValues() {
    let educationToEdit = this.getEducationById(this.educationSelectedId);

    this.type.setValue(educationToEdit.type);
    this.level.setValue(educationToEdit.level);
    this.name.setValue(educationToEdit.name);
    this.university.setValue(educationToEdit.university);
    this.finishDate.setValue(educationToEdit.finishDate);
  }

  getEducationById(id: number) {
    return this.user.education.find((education) => {
      return education.id == id;
    });
  }

  /*   pushEducation() {
    let educations = this.user.education;
    let edited = this.educationSelectedId - 1;
    let neweducationData = this.educationForm.value;

    edited < 0
      ? this.pushNewEducation(educations, neweducationData)
      : this.pushEditedEducation(educations, edited, neweducationData);
  } */

  /*   pushEditedEducation(educations, edited, neweducationData) {
    educations[edited] = {
      ...educations[edited],
      ...neweducationData,
    };
  }
  pushNewEducation(educations, neweducation) {
    neweducation.id = educations.length + 1;
    educations.push(neweducation);
  } */

  getLevelOptions() {
    return this.type.value === 'grado'
      ? this.levelOptions.grado
      : this.levelOptions.fp;
  }
}
