<template>
    <div>
        <h2 id="page-heading">
            <span id="event-of-plate-mill-heading">Event Of Plate Mills</span>
            <router-link :to="{name: 'EventOfPlateMillCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-event-of-plate-mill">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new EventOfPlateMill
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <div class="row">
            <div class="col-sm-12">
                <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
                    <div class="input-group w-100 mt-3">
                        <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                            
                            v-model="currentSearch" />
                        <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
                            <font-awesome-icon icon="search"></font-awesome-icon>
                        </button>
                        <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                            v-if="currentSearch">
                            <font-awesome-icon icon="trash"></font-awesome-icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <br/>
        <div class="table-responsive" v-if="eventOfPlateMills">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('eventDate')"><span>Event Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('eventName')"><span>Event Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="eventOfPlateMill of orderBy(eventOfPlateMills, propOrder, reverse === true ? 1 : -1)"
                    :key="eventOfPlateMill.id">
                    <td>
                        <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}">{{eventOfPlateMill.id}}</router-link>
                    </td>
                    <td>{{eventOfPlateMill.eventDate}}</td>
                    <td>{{eventOfPlateMill.eventName}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'EventOfPlateMillEdit', params: {eventOfPlateMillId: eventOfPlateMill.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(eventOfPlateMill)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="platemillvuejsApp.eventOfPlateMill.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-eventOfPlateMill-heading" >Are you sure you want to delete this Event Of Plate Mill?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-eventOfPlateMill" v-on:click="removeEventOfPlateMill()">Delete</button>
            </div>
        </b-modal>
        <div v-if="eventOfPlateMills && eventOfPlateMills.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./event-of-plate-mill.component.ts">
</script>
