<template>
    <div>
        <h2 id="page-heading">
            <span id="shift-manager-heading">Shift Managers</span>
            <router-link :to="{name: 'ShiftManagerCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-shift-manager">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new ShiftManager
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
        <div class="table-responsive" v-if="shiftManagers">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Name</span></th>
                    <th><span>Designation</span></th>
                    <th><span>Mobile Number</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="shiftManager in shiftManagers"
                    :key="shiftManager.id">
                    <td>
                        <router-link :to="{name: 'ShiftManagerView', params: {shiftManagerId: shiftManager.id}}">{{shiftManager.id}}</router-link>
                    </td>
                    <td>{{shiftManager.name}}</td>
                    <td>{{shiftManager.designation}}</td>
                    <td>{{shiftManager.mobileNumber}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ShiftManagerView', params: {shiftManagerId: shiftManager.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ShiftManagerEdit', params: {shiftManagerId: shiftManager.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(shiftManager)"
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
            <span slot="modal-title"><span id="platemillvuejsApp.shiftManager.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-shiftManager-heading" >Are you sure you want to delete this Shift Manager?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-shiftManager" v-on:click="removeShiftManager()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./shift-manager.component.ts">
</script>
