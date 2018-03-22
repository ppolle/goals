import { Component, OnInit } from '@angular/core';
import {Goal} from '../goal';
import {Goals} from '../goals';
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {HttpClient} from '@angular/common/http';
import {Quote} from '../quote-class/quote';
import {QuoteRequestService} from '../quote-http/quote-request.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  providers:[GoalService,QuoteRequestService],
  styleUrls: ['./goal.component.css']
})

export class GoalComponent implements OnInit {

    goals:Goal[];
    quote:Quote;
    alertService:AlertsService;

    constructor(goalService:GoalService,alertService:AlertsService,private quoteService:QuoteRequestService,private router:Router) {
      this.goals = goalService.getGoals();
      this.alertService = alertService;
   }

   goToUrl(id){
        this.router.navigate(['/goals',id])
    }

       deleteGoal(index){
            let toDelete=confirm(`Are you sure you want to delete ${this.goals[index].name}`)

            if(toDelete){
                this.goals.splice(index,1)
                this.alertService.alertMe("You have succsfully deleted one of your goals")
        }
    }
          
    toogleDetails(index){
        this.goals[index].showDescription = !this.goals[index].showDescription;
    }

    addNewGoal(goal){
        let goalLength = this.goals.length;
        goal.id=goalLength+1;
        goal.completeDate = new Date(goal.completeDate)
        this.goals.push(goal)

    }

  ngOnInit() {
    this.quoteService.quoteRequest();
    this.quote=this.quoteService.quote;
  }
}